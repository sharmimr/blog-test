import {useEffect,useState} from 'react';
import './../index.css';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from './PaginationComponent';
import ModalComponent from './ModalComponent';
import Form from 'react-bootstrap/Form'

const BlogComponent=()=>{
    const [posts,setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(20);
    const [search, setSearch] = useState('');
    
    const fetchData = () =>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>res.json())
        .then((jsondata)=>{
            setPosts(jsondata);
        })
    }

    useEffect(()=>{
        fetchData();
    },[]);

    //Get currentPosts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Implement page numbers
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    //Set current page
    const setPage = (pageNum) => {
      setCurrentPage(pageNum);
    }

    const handleFirst = () =>{
            setCurrentPage(1)
    }

    const handlePrev = () =>{
        setCurrentPage(currentPage - 1)
}

    const handleNext = () =>{
        setCurrentPage(currentPage + 1)
    }

    const handleLast = () =>{
        setCurrentPage(Math.ceil(posts.length / postsPerPage))
    }

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (e,id) => {
        setShowModal(true);
    }

    const deletePost=(id)=>{
      setPosts(posts.filter(items=>items.id !== id))
    }
    
    const setPostsOnSearch=()=>{
        if(search == ''){
            fetchData();
            setCurrentPage(1);
        }
        else{
            setPosts(posts.filter(items=>items.title.includes(search)
            ));
            setCurrentPage(1);
        }
    }

    return(
        <Container>
        <div className="App-header">
            <h4>Blogs From JSON Placeholder</h4>
        </div>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </Form.Group>
        <Form.Group>
            <Button onClick={setPostsOnSearch}>Search</Button>
        </Form.Group> 
    </Form>
        <Row xs={1} md={2} className="g-4">
        {currentPosts.map((post,idx)=>(
            <Col key={idx}>
                <Card style={{ width: '100%',marginTop:'10px',backgroundColor:'#f9f7fa' }}>
                <Card.Body>
                    <Card.Title style={{color:'white',backgroundColor:'#805d99',padding:'5px'}}>{post.id}. {post.title}</Card.Title>
                    <Card.Text>
                        {post.body}
                    </Card.Text>
                    <Button href="#" className="btn-primary" style={{margin:'0 5px',width:'100px'}} onClick={(e)=>handleShowModal(e,post.id)}>Edit</Button>
                    <Button href="#" className="btn-danger" style={{margin:'0 5px',width:'100px'}} onClick={()=>deletePost(post.id)}>Delete</Button>
                </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
          <Pagination 
            currentPage={currentPage} 
            handleFirst={handleFirst} 
            handlePrev={handlePrev} 
            handleNext={handleNext} 
            handleLast={handleLast} 
            pageNumbers={pageNumbers}
            setPage={setPage}
            postsPerPage={postsPerPage}
            posts={posts}
          />
        <ModalComponent handleCloseModal={handleCloseModal} showModal={showModal}/>
    </Container>
    )
    
    
}

export default BlogComponent;
