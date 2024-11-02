import { useAuth } from '../AuthProvider';
import L from '../lib/logger';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import api from '../api';
import { Card } from '@/components/ui/card';

export default function Comments({ blogId, comments, className }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const formSchema = z.object({
    content: z.string().min(1, {
      message: 'Comment required',
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    L.log('in onsubmit');
    if (!isAuth()) return navigate('/login');
    L.log(values);

    api.post(`http://localhost:3000/blogs/${blogId}/comments`, values)
      .then(function(response) {
        console.log(response);
        navigate(`/blogs/${blogId}`);
      }).catch(function(error) {
        console.log(error);
      });
  }
  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea placeholder="Add your comment here..." id="content" className="resize-y bg-black h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end font-semibold text-base px-2 py-1 leading-none h-fit mt-2">Submit</Button>
        </form>
      </Form>
      <div className="mt-8">
        {comments.map(comment => (
          <Card key={comment.id} className="px-4 py-2 mt-2">
            <div>@{comment.author.username}</div>
            <div>{comment.content}</div>
          </Card>
        ))}
      </div>
    </div >
  );
}
