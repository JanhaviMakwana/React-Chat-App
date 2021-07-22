import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <section>
                <div className="py-5">
                    <div className="py-5">
                        <h1 className="display-4">Welcome to Chatt</h1>
                        <p className="lead">A great place to share your thoughts with friends</p>
                        <div className="mt-4">
                            <Link className="btn btn-primary px-5 mr-3" to="/auth">Login To Your Account</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;