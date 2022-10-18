import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';

const Table = () => {
    const [datas, setData] = useState([]);
    const [dup, setDup] = useState([]);
    const [names, setName] = useState("");

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleExport = () => {
        const headings = [[
            'Movie',
            'Category',
            'Director',
            'Rating'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, datas, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Report.xlsx');
    }

    // const getdup = datas.map((data,index)=>{
    //    return (
    //     setDup(JSON.stringify(data.FIRSTNAME + " " + data.LASTNAME))
        
    //    )
    // });

   


     

    return (
        <>
            <div className="container ">
                
                <div className="d-flex border shadow mb-3">
                     
                        <div className="col bg-secondary p-3 d-flex">
                            <div className="custom-file">
                                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                
                            </div>
                            <div className="">
                                <button onClick={handleExport} className="btn btn-dark shadow">
                                    Export <i className="fa fa-download"></i>
                                </button>    
                            </div>
                        </div>
                        <div className="col bg-secondary p-3 d-flex  flex-row-reverse">
                            
                            <div className="d-inline-flex shadow">
                                <input className="outline-0 border-0 ps-auto" type="text" name="" id="" />
                                <button className="btn btn-dark">Search</button>
                            </div>
                            
                           
                        </div>
                    
                </div>
            </div>
            
            <div className=" container overflow-scroll">
                <div className="d-flex m-1">
                    <label htmlFor="suspected ">Duplicate Names: </label>
                    <button className="border-0 bg-white rounded-circle"><span id="suspected" className=" py-2 badge bg-warning justify-content-center rounded-circle">5</span></button>
                    <label htmlFor="suspected">Duplicate ID Number: </label>
                    <button className="border-0 bg-white rounded-circle"><span id="suspected" className=" py-2 badge bg-danger justify-content-center rounded-circle">2</span></button>
                
                </div> 
                    <table className="table table-striped table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">ADL</th>
                                <th scope="col">LAST_NAME</th>
                                <th scope="col">FIRST_NAME</th>
                                <th scope="col">MIDDLE_NAME</th>
                                <th scope="col">EXT NAME</th>
                                <th scope="col">FIRST_/_LAST_NAME</th>
                                <th scope="col">BIRTHDAY</th>
                                <th className="" >ADDRESS(Street,Barangay,Municipality,Province,District)</th>
                                <th scope="col">TYPE_OF_ID</th> 
                                <th scope="col">ID</th>
                                <th scope="col">CONTACTS</th>
                                <th scope="col">E-PAYMENT/BANK ACC #</th>
                                <th scope="col">TYPE OF BENEFICIARY</th>
                                <th scope="col">OCCUPATION</th>
                                <th scope="col">SEX</th>
                                <th scope="col">CIVIL STATUS</th>
                                <th scope="col">AGE</th>
                                <th scope="col">DEPENDENT</th>
                                <th scope="col">INTERESTED IN SKILLS TRAINING?</th>
                                <th scope="col">IF YES INDICATE SKILLS</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody> 
                                
                                {
                                    datas.length
                                    ?
                                    datas.map((data, index) => (
                                        
                                        <tr key={index}>
                                            {/* Set the Full Name to use State Object */}
                                            {/* {setName(data.FIRSTNAME + " " + data.LASTNAME)} */}

                                            <th scope="row">{ index+1 }</th>
                                            <td className="text-warning">{data.ADL}</td>
                                            <td>{data.LASTNAME}</td>
                                            <td>{data.FIRSTNAME}</td>
                                            <td>{data.MIDDLENAME}</td>
                                            <td>{data.EXTNAME}</td>
                                            <td><b className="text-primary">{data.FIRSTNAME} {data.LASTNAME}</b> </td>
                                            <td>{data.BIRTHDAY}</td>
                                            <td>
                                                <small>Street: <b className="text-primary"> {data.STREET} </b> Barangay: <b className="text-primary"> {data.BARANGAY}</b></small><br />
                                                <small>Municipality: <b className="text-primary"> {data.MUNICIPALITY}</b> Province: <b className="text-primary">{data.PROVINCE}</b> </small><br />
                                                <small>District: <b className="text-primary"> {data.DISTRICT}</b></small>
                                                
                                            </td>
                                            <td>{data.TYPEOFID}</td>
                                            <td>{data.IDNUMBER}</td>
                                            <td>{data.CONTACTS}</td>
                                            <td>{data.EPAYMENT}</td>
                                            <td>{data.TYPEOFBENE}</td>
                                            <td>{data.OCCUPATION}</td>
                                            <td>{data.SEX}</td>
                                            <td>{data.CIVILSTATUS}</td>
                                            <td>{data.AGE}</td>
                                            <td>{data.BENEFICIARY}</td>
                                            <td>{data.INTERESTEDINSKILLS}</td>
                                            <td>{data.SKILLS}</td>
                                            
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="21" className="text-center">No Rows Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                 
            </div>
        </>

    );
};

export default Table;
