import React, {useState} from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'
import { read, utils, writeFile } from 'xlsx';

export const MaterialTable = () => {

    

    const [datas, setData] = useState([]); 

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


  return (
    <>
         
        <div className="custom-file">
            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            
        </div>
        <TableContainer className='container' >
            <Table className='table table-dark table-hover'>
                <TableHead>
                    <TableRow  >
                        <TableCell className='text-white' >NO</TableCell>
                        <TableCell className='text-white'  >ADL</TableCell>
                        <TableCell className='text-white'  >LAST_NAME</TableCell>
                        <TableCell className='text-white' >FIRST_NAME</TableCell>
                        <TableCell className='text-white' >MIDDLE_NAME</TableCell>
                        <TableCell className='text-white' >EXT NAME</TableCell>
                        <TableCell className='text-white' >FIRST/LAST_NAME</TableCell>
                        <TableCell className='text-white' >BIRTHDAY</TableCell>
                        <TableCell className='text-white' >ADDRESS(Street,Barangay,Municipality,Province,District)</TableCell>
                        <TableCell className='text-white' >TYPE_OF_ID</TableCell> 
                        <TableCell className='text-white' >ID NUMBER</TableCell>
                        <TableCell className='text-white' >CONTACTS</TableCell>
                        <TableCell className='text-white' >E-PAYMENT/BANK ACC #</TableCell>
                        <TableCell className='text-white' >TYPE OF BENEFICIARY</TableCell>
                        <TableCell className='text-white' >OCCUPATION</TableCell>
                        <TableCell className='text-white' >SEX</TableCell>
                        <TableCell className='text-white' >CIVIL STATUS</TableCell>
                        <TableCell className='text-white' >AGE</TableCell>
                        <TableCell className='text-white' >DEPENDENT</TableCell>
                        <TableCell className='text-white' >INTERESTED IN SKILLS TRAINING?</TableCell>
                        <TableCell className='text-white' >IF YES INDICATE SKILLS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        datas.map((data,index) => (
                            <TableRow 
                            
                            key={index}
                            sx={{'&:last-child td, &:last-child th':{border:0}}}
                            >
                                <TableCell className='text-white'>{index+1}</TableCell>
                                <TableCell className='text-white' >{data.ADL}</TableCell>
                                <TableCell className='text-white'>{data.LASTNAME}</TableCell>
                                <TableCell className='text-white'>{data.FIRSTNAME}</TableCell>
                                <TableCell className='text-white'>{data.MIDDLENAME}</TableCell>
                                <TableCell className='text-white'>{data.EXTNAME}</TableCell>
                                <TableCell className='text-white'><b className="text-primary">{data.FIRSTNAME} {data.LASTNAME}</b> </TableCell>
                                <TableCell className='text-white'>{data.BIRTHDAY}</TableCell>
                                <TableCell className='text-white'>
                                    <small>Street: <b className="text-primary"> {data.STREET} </b> Barangay: <b className="text-primary"> {data.BARANGAY}</b></small><br />
                                    <small>Municipality: <b className="text-primary"> {data.MUNICIPALITY}</b> Province: <b className="text-primary">{data.PROVINCE}</b> </small><br />
                                    <small>District: <b className="text-primary"> {data.DISTRICT}</b></small>
                                    
                                </TableCell>
                                <TableCell className='text-white'>{data.TYPEOFID}</TableCell>
                                <TableCell className='text-white'>{data.IDNUMBER}</TableCell>
                                <TableCell className='text-white'>{data.CONTACTS}</TableCell>
                                <TableCell className='text-white'>{data.EPAYMENT}</TableCell>
                                <TableCell className='text-white'>{data.TYPEOFBENE}</TableCell>
                                <TableCell className='text-white'>{data.OCCUPATION}</TableCell>
                                <TableCell className='text-white'>{data.SEX}</TableCell>
                                <TableCell className='text-white'>{data.CIVILSTATUS}</TableCell>
                                <TableCell className='text-white'>{data.AGE}</TableCell>
                                <TableCell className='text-white'>{data.BENEFICIARY}</TableCell>
                                <TableCell className='text-white'>{data.INTERESTEDINSKILLS}</TableCell>
                                <TableCell className='text-white'>{data.SKILLS}</TableCell>
                             </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer> 


    </>

  )
}

export default MaterialTable;