import React, { Component } from 'react';
import './App.css';
import { ExcelRenderer} from 'react-excel-renderer';
import { Col, Input, InputGroup, InputGroupAddon, FormGroup, Button, Fade, FormFeedback, Container , Table } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this); 
    this.openNewPage = this.openNewPage.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });
        }
      }); 
  }

    fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      //check for file extension and pass only if it is .xlsx || .xls and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx" ||  "xls"){
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  openNewPage = (chosenItem) => {
    const url = chosenItem === "github" ? "https://ghostcoder.weebly.com" : "https://sgngcobo.weebly.com";
    window.open(url, '_blank');
  }

  render() {
    return (
      <div>
        <Container>
        <form>
          <FormGroup row>     
            <Col xs={4} sm={8} lg={10}>                                                     
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="info" style={{color: "white", zIndex: 0}} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}} />                                
                </InputGroupAddon>
                <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />                                              
                <FormFeedback>    
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                    Please select a .xlsx file only !
                  </Fade>                                                                
                </FormFeedback>
              </InputGroup>     
            </Col>                                                   
          </FormGroup>   
        </form>

        {this.state.dataLoaded && 
        <div>
              <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Upload</th>
                </tr>
              </thead>
              <tbody>
              {
               this.state.rows.map((todo) =>
                  <tr>
                  <td>{todo[7]}</td>
                  <td> <Button color="success">Success</Button>{' '}</td>
                  <td><Button color="danger">Re-Upload</Button>{' '}</td>
                </tr>
               )
             }  
                
              </tbody>
            </Table>
        </div>}
        </Container>
      </div>
    );
  }
}

export default App;
