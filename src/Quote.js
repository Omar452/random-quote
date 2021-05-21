import React from 'react';

class Quote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote: {},
        }
        this.setQuote = this.setQuote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    async getQuotes(){
        const request = await fetch('https://freequote.herokuapp.com/');
        const data = await request.json();
        return data;
    }
    setQuote(){
        this.getQuotes()
            .then( data => {
                this.setState({
                    quote: data,
                })
            })
            .catch( err => console.log(err));
    }
    handleClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.getQuotes()
            .then( data => {
                this.setState({
                    quote: data,
                })
            })
            .catch( err => console.log(err));
        
    }
    componentDidMount(){
        this.setQuote();
    }

    render(){
        return(
            <div id="quote-box">
                <p id="quote-text"><i className="fas fa-quote-left"></i> {this.state.quote.quote} <i className="fas fa-quote-right"></i></p>
                <p id="author">- {this.state.quote.author}</p>
                <div>
                    <div>
                        <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                    </div>
                    <div>
                        <button id="new-quote" onClick={this.handleClick}>CHANGE QUOTE</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quote;