import api from "./api";
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
  FormLabel,
} from '@/components/ui/form';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import L from './lib/logger';
import axios from "axios";
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import NavBar from './components/navbar';

function NewBlogPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const formSchema = z.object({
    title: z.string().min(1, {
      message: 'Blog title required',
    }),
    content: z.string().min(1, {
      message: 'Blog content required',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    L.log(values);

    axios({
      method: 'post',
      url: 'http://localhost:3000/blogs',
      data: values
    }).then(function(response) {
      L.log('got response');
      L.log('got response');
      L.log('got response');
      console.log(response);
      navigate('/');
    }).catch(function(error) {
      console.log(error);
    });
  }

  return (

    <>
      <NavBar />
      <div className="flex justify-center mt-8">
        <div className="w-[1000px]">
          <h1 className="text-xl font-bold mb-3">Post a new blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-inherit flex flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel htmlFor="text">Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Add your title here" {...field} />
                    </FormControl>
                  </FormItem>
                }
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="content">Your message</FormLabel>
                    <FormControl>
                      <AutosizeTextarea placeholder="Type your message here." id="content" className="resize-y bg-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-end font-semibold">Submit</Button>
            </form>
          </Form>
        </div >
      </div >
    </>
  );
}

export default NewBlogPage;
