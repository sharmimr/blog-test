import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent =(props)=>{

return(
<div style={{ display: 'block', width: 700, padding: 30 }}>
            <h4>React-Bootstrap Pagination Component</h4>
            <Pagination>
                <Pagination.First onClick={props.handleFirst} className={props.currentPage === 1 ? 'disabled':''}/>
                <Pagination.Prev onClick={props.handlePrev} className={props.currentPage === 1 ? 'disabled':''}/>
                {
            props.pageNumbers.map((pageNum, index) => (
              <Pagination.Item key={index} className={pageNum === props.currentPage ? "disabled" : ""} onClick={() => {props.setPage(pageNum)}}>
                {pageNum}
              </Pagination.Item>
            ))
          }
                <Pagination.Next onClick={props.handleNext} className={props.currentPage === Math.ceil(props.posts.length / props.postsPerPage) ? 'disabled':''}/>
                <Pagination.Last onClick={props.handleLast} className={props.currentPage === Math.ceil(props.posts.length / props.postsPerPage) ? 'disabled':''}/>
            </Pagination>
        </div>
)
}

export default PaginationComponent;