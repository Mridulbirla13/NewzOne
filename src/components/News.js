import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize:8,
      category: 'general'
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    capitalize = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props){
        super(props);
        console.log("Hello I am constructor from News Component");
        this.state = {
            articles:[],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalize(this.props.category)} - NewzOne`;
    }

    async updateNews(pageNo){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json()
      this.props.setProgress(70);
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles, 
        totalResults:parsedData.totalResults,
        loading:false,
      })
      this.props.setProgress(100);
    }

    async componentDidMount(){
      this.updateNews();
  
    }

    handlePreviousClick=async ()=>{
      this.setState({page: this.state.page -1})
      this.updateNews();
    }

    handleNextClick=async ()=>{
      this.setState({page: this.state.page +1})
      this.updateNews();
    }
    
    fetchMoreData = async() => {
      
      this.setState({page: this.state.page +1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles), 
        totalResults:parsedData.totalResults,
        loading:false,
      })
    };

    render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-5" >NewzOne - Top {this.capitalize(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title} description={element.description?element.description.slice(0,150):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        
        <div class="d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button> 
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  
        </div>
        
      </div>
    )
  }
}