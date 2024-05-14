import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor(){
        super();
        console.log("Hello I am constructor from News Component");
        this.state = {
            articles:[],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=680640962660406984c0e66da05133a9&page-1";
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})
  
    }

    handlePreviousClick=async ()=>{
      console.log('Previous');
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=680640962660406984c0e66da05133a9&page=${this.state.page-1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      
      this.setState({
        articles: parsedData.articles,
        page:this.state.page - 1,
      })
    }

    handleNextClick=async ()=>{
      console.log('Next');
      if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

      }else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=680640962660406984c0e66da05133a9&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        
        this.setState({
          articles: parsedData.articles,
          page:this.state.page + 1,
        })
      }
      
    }
    
    render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description?element.description.slice(0,150):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div class="d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button> 
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  
        </div>
        
      </div>
    )
  }
}