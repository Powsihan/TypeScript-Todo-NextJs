"use client"
import Button from '@/components/Button'
import React, { useState } from 'react'

interface datas{
    id:number,
    fist_name:string,
    last_name:string,
}
const page = () => {

    const data1:Array<any> = [
       1,2
    ]
    const [data, setData] = useState<Array<number>|null>(null);

    function test(): string {
        return "test";
      }
    return (
        <div>
            <Button text={"hi heloo"} />
            {/* {data1.map((item:data)=>{
                return <div key={item.id}>{item.fist_name}</div>
            })} */}
        </div>
    )
}

export default page
