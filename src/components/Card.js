function Card(props) {
    return (
        <div className=" container" >
            <div className="  row justify-content-center">
                <div className="col-md-18">
                    <div className="card mt-5">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>     
    );
}

export default Card;
