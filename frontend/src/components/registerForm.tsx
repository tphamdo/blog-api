import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 4 characters.',
  }),
});

export default function ProfileForm() {
  const [error, setError] = useState('');
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    console.log(res);
    if (res.ok) {
      const json = await res.json();
      if (json.token) saveToken(json.token);
      navigate('/newBlog');
    } else {
      if (res.status === 409)
        setError('That username already exists');
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); // Flash for 3 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [error]);

  return (
    <div className="w-72">
      <h1 className="text-xl font-bold mb-3">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-inherit flex flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Username" autoComplete="username" {...field} />
                </FormControl>
              </FormItem>
            }
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button type="submit" className="self-end font-semibold">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
