package com.xiong.blog;

public class TestThread {
     public static  void main(String[] args) throws InterruptedException{

         Object object = new Object();
         Thread t1 = new Thread(()->{
             synchronized (object){
                 try{
                     System.out.println(System.currentTimeMillis()+":t1 start");
                     object.wait();
                     System.out.println(System.currentTimeMillis()+":t1 end");
                 }catch (InterruptedException e){
                     e.printStackTrace();
                 }
             }
         });

         Thread t2 = new Thread(()->{
             synchronized (object){
                 System.out.println(System.currentTimeMillis()+":t2 start");
                 object.notify();
                 System.out.println(System.currentTimeMillis()+":t2 end");
                 try {
                     Thread.sleep(2000);
                 }catch (InterruptedException e){
                     e.printStackTrace();
                 }
             }
         });
         t1.start();
         t2.start();
     }
}
