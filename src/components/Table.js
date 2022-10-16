import React, {useRef, useEffect, useState} from 'react';
import {read, utils, writeFile} from 'xlsx';

const Table = () => {
    const ref = useRef(null);
    const Header=[];
     
    const [tData, setTData] = useState([]);

    useEffect(()=>{
        const handleClick = event =>{
            //************* E X C E L  F I L E ****************
            if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type))
            {
                
                document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';   
                element.value = '';
                return false;
            }

            const reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            
            reader.onload = function(event){
                const data = new Uint8Array(reader.result);
                const work_book = read(data, {type:'array'});
                const sheet_name = work_book.SheetNames;
                const sheet_data = utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});
                //setTData(sheet_data);
               console.log('data length:', sheet_data.length)
                if(sheet_data.length > 0){
                    for(let row = 0; row < 1; row++){
                        for(let col = 0; col < sheet_data[0].length; col++){
                            //Header = sheet_data[row][col];
                            console.log(sheet_data[row][col]);
                        }
                    }                                      
                }
                 

                    const wb = utils.book_new();
                    const ws = utils.json_to_sheet([]);
                    utils.sheet_add_aoa(ws, Header);
                    utils.sheet_add_json(ws, tData, { origin: 'A2', skipHeader: true });
                    //utils.book_append_sheet(wb, ws, 'Report');
                    //writeFile(wb, 'Report.xlsx');
                 
                    
    
            }
        }
            //************* E X C E L  F I L E ****************
      
        const element = ref.current;
        element.addEventListener('change', handleClick);
        element.classList.add('bg-success');

        return () =>{
            element.removeEventListener('change', handleClick);
        }
    }, []);


  return (
    <div>
        <input type="file" ref={ref} name="" id="excel_file" />
        <div className="excel_data">
            <div>
                 <div>
                    {
                        // tData.length
                        // ? 
                        // tData.map((data,index)=>{
                        //     <div className="">
                        //        <div className="">{Header}</div>
                               
                        //     </div>
                            
                        //     //console.log(Header)
                        // })
                        // : 
                        // 'no data'
                    }
                 </div>
            </div>
           
        </div>
    </div>
  )
}

export default Table
