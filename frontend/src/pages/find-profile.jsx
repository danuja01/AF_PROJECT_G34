import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/layout";

function SearchProfile() {

    const [searchby, setSearchBy] = useState("num");
    const [keyword, setKeyword] = useState("");


    function SearchProfile(e) {
        e.preventDefault();
        window.location.replace(`http://localhost:3000/find-profile/${searchby}/${keyword}`);
    }

    return (
        <>
            <Layout >
                <div style={{ width: "90%", margin: "auto" }}>
                    <br></br>
                    <div style={{ width: "50%", margin: "auto" }}>
                        <center>
                            <form role="search" onSubmit={SearchProfile}>
                                <div className="row">
                                    <div className="col-8">
                                        <input type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
                                            setKeyword(e.target.value);
                                        }} required />
                                    </div>
                                    <div className="col-0">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">Search</button>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-2">
                                        <b>Search By</b>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="searchby" id="flexRadioDefault1" value="username" onClick={(e) => {
                                            setSearchBy(e.target.value);
                                        }} required />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Username
                                        </label>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="searchby" id="flexRadioDefault2" value="firstname" onClick={(e) => {
                                            setSearchBy(e.target.value);
                                        }} required />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            First Name
                                        </label>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;

                                </div>

                            </form>
                        </center>
                    </div>

                    <br></br>

                </div>
            </Layout>
        </>
    )

}

export default SearchProfile;