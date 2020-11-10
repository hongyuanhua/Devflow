import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


class IntroPage extends Component {
    state = {
    }

    render() {
        return (
            <div>
                <div style={{ background: "purple", height: '70vh', width: '100vw', color: 'white' }}>

                    <div className="mx-auto" style={{ width: 'fit-content' }}>
                        <span style={{ fontStyle: 'italic', fontSize: 200 }}>DevFlow</span>
                        <br />
                        <span style={{ fontSize: '30px', marginTop: '200px' }}>DevFlow is committed to providing you and your
                        <br />company with faster task allocation more convenient
                        <br /> operation, and the best quality service!</span>
                    </div>


                </div>

                <div>
                    <div className="mx-auto" style={{ width: 'fit-content' }}>
                        <div>
                            <Link to="/login">
                                <button
                                    className="btn btn-primary btn-lg m-5"
                                    style={{ width: '100px' }}
                                >
                                    Enter
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}


export default IntroPage;