import React from 'react'

const Footer = () => {
    return (
        <div className="Footer">
        <div className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <img className="mb-2" src="../../assets/brand/bootstrap-solid.svg" alt="" width="24" height="24"/>
            <small className="d-block mb-3 text-muted">&copy; 2017-2018</small>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Cool stuff</a></li>
              <li><a className="text-muted" href="#">Random feature</a></li>
              <li><a className="text-muted" href="#">Team feature</a></li>
              <li><a className="text-muted" href="#">Stuff for developers</a></li>
              <li><a className="text-muted" href="#">Another one</a></li>
              <li><a className="text-muted" href="#">Last time</a></li>
            </ul>
          </div>
        </div>
      </div>
        </div>
        </div>
        
    )
}

export default Footer
