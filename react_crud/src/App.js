import React, { useState, useEffect } from "react";
import "./styles.css"


function App() {
  const [alldata, setAlldata] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [entry, setEntry] = useState("");
  const [id, setId] = useState("");
  const [x, setX] = useState(0);
  const [modal, setModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => { 
      

        async function fetchMyAPI() {
          fetch("http://localhost:3002/posts")
          .then(res => res.json())
          .then(result =>
            {
              setAlldata(result);
            }
          )
          .catch(console.log);
        }
        fetchMyAPI();
  },[x]);


  const createList = async () => {
    await fetch("http://localhost:3002/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, author, entry})
    }).then(
      setTitle(""),
    setAuthor(""),
    setEntry("")).then( setX(x+1)).then(setX(x+1));
      
  };

  const openUpdateForm = async (id) => {
     await fetch("http://localhost:3002/posts/" + id)
      .then(res => res.json())
      .then(result => {
        setId(result.id);
        setTitle(result.title);
        setAuthor(result.author);
        setEntry(result.entry);
        setModal(true);
      }).then(setX(x+1));
    
  }

  const updateList = async (id) => {
    await fetch("http://localhost:3002/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, author, entry})
    })
      .then(res => res.json())
      .then(result => {
        setTitle("");
        setAuthor("");
        setEntry("");
        setIsCreate(true);
        
      }).then(setX(x+1));
  }

  const deleteList = async (id) => {
    await fetch("http://localhost:3002/posts/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        setTitle("");
        setAuthor("");
        setEntry("");
        setIsCreate(true);
       
      }).then( setX(x+1));
  }



  const Lists = (props) => {
    var rows = [];
    props.forEach(element => {
        rows.push(
        <tr key={element.id}>
            
            <td>{element.title}</td>
            <td>{element.author}</td>
            <td>{element.entry}</td>
            <td>{ <button class="btn btn-primary" onClick={() => {
              setIsCreate(false);
              openUpdateForm(element.id);
              
            }}>Update</button>}</td>
            <td>{  <button class="btn btn-primary" onClick={() => deleteList(element.id)}>Delete</button>}</td>
        </tr>)
    });
    return(
      <table className="table table-striped"  style={{width: "100%"}}>
          <thead>
              <tr>
                 
                  <th>Title</th>
                  <th>Author</th>
                  <th>Entry</th>
                  <th>Update</th>
                  <th>Delete</th>
              </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
    )
}


    return (

      <div>
      
      <nav class="navbar navbar-inverse navbar-static-top">
  <div class="container-fluid">
   
    <div class="navbar-header" >
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="https://github.com/MehmetAnilIrfanoglu/React_Crud/tree/master/react_crud">React Crud</a>
    </div>

   
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     
     
      <ul class="nav navbar-nav navbar-right">
        <li>
        
        <button  type="button" class="btn btn-primary navbar-btn"  onClick={() => {
          setIsCreate(true);
          setModal(!modal);
          
        }}>
            Create Entry
          </button>
       
        </li>
        
      </ul>
    </div>
  </div>
</nav>





<div  style= {{width: "100%", marginLeft:"0", marginRight:"0"}}>
        <br />
        {
        Lists(alldata)  
        }
        </div>
      
      
      {modal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">
                                        New List
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="px-8 pt-6 pb-8 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="numOfWeeks"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Author
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lessonPerWeek"
                                            type="text"
                                            value={author}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Entry
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lessonPerWeek"
                                            type="text"
                                            size="100"
                                            value={entry}
                                            onChange={(e) =>
                                                setEntry(e.target.value)
                                            }
                                        />
                                    </div>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => setModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={ async () => {
                                            if (isCreate) {
                                             await createList();
                                            } else {
                                             await updateList(id);
                                            }
                                            setModal(false);
                                            setIsCreate(true);
                                        }}
                                    >
                                        {isCreate ? "Create" : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}


      </div>
    );
  
}

export default App;