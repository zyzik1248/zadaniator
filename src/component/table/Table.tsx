import React from 'react';
import "./Table.scss"
import { IData } from '../../types';

interface IProps {
    body: Object[]
    handleEdit?: (data: object) => void
    handleDelete?: (data: object) => void
    noDelete: number[]
}

const Table: React.FC<IProps> = ({ body, handleEdit, handleDelete, noDelete=[] }) => {

    return (
        <>
            {body.length ?
                <div className="table-wrapper">
                    <div className="table-header" style={{
                        gridTemplateColumns: `repeat(${Object.keys(body[0]).length}, 1fr) 0.3fr`,
                    }}>
                        {
                            Object.keys(body[0]).map(key =>
                                <p key={key}>{key}</p>
                            )
                        }
                    </div>
                    {
                        body.map((data: IData) => (
                            <div key={data.id} className="table-row" style={{
                                gridTemplateColumns: `repeat(${Object.keys(body[0]).length}, 1fr) 0.3fr`,
                            }}>
                                {
                                    Object.values(data).map((value, index) => (
                                        <p key={index}>{value || "-"}</p>
                                    ))
                                }
                                <div className="editor">
                                    {
                                        handleEdit && 
                                        <button className="ed" onClick={() => handleEdit(data)}>
                                            <span className="material-symbols-outlined pencil">
                                                edit
                                            </span>
                                        </button>
                                    }
                                    {
                                        handleDelete && !noDelete.find(el=>el == data.id) &&
                                        <button onClick={() => handleDelete(data)} className="ed">
                                            <span className="material-symbols-outlined trash">
                                                delete
                                            </span>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div> : <></>
            }
        </>
    )
}

export default Table