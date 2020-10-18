import React from 'react'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
class ApexChart extends React.Component { 
    constructor(props) {
      super(props);  
      console.log(props.data.weekChart); 
      this.state = {   
        series: [{
          name: 'candle',
          data: this.props.data.minute
        }],
        options: {
          chart: {
            background: '#fff',
            height: 350,
            type: 'candlestick',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 400,
              animateGradually: {
                  enabled: true,
                  delay: 20
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
          }
          },
          title: {
            text: ' ',
            align: 'left'
          },
          annotations: {
            xaxis: [
              {
                x: 'Oct 06 14:00:00', 
                borderColor: '#00E396',
                label: {
                  borderColor: '#00E396',
                  style: {
                    fontSize: '12px',
                    color: '#fff',
                    background: '#00E396'
                  },
                  orientation: 'horizontal',
                  offsetY: 7,
                  text: 'Annotation Test'
                }
              }
            ]
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function(val) {
                return dayjs(val).format('MMM DD HH:mm:ss')
              } 
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      
      
      };
    } 
    onClick() { 
      window.location.reload();
       
      }
      renderPrice = () => {
        console.log(this.props.data.detail)
        if (this.props.data.detail) {
          return (
            <>
            <Link className="back-to-cryptos"style={{fontWeight:'bold', fontSize:'large', display:'block', paddingBottom:'.7rem'}} to ="/">Back to cryptos</Link>
              <p className="my-0">${this.props.data.detail.current_price.toFixed(2)}</p>
              <p
                className={
                  this.props.data.detail.price_change_24h < 0
                    ? "text-danger my-0"
                    : "text-success my-0"
                }
              >
                {this.props.data.detail.price_change_percentage_24h.toFixed(2)}%
              </p>
            </>
          );
        }
      };
    render() {
      return ( 
        <div className="bg-white border mt-2 rounded p-3">

        <div id="chart"> 
          <div className="d-flex justify-content-between">
          <div>{this.renderPrice()}</div> 
        <button style={{height:'2.7rem'}} className="btn btn-primary" onClick={this.onClick}>
         Get latest price
         </button>        
         </div>
          <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
        <div className="chart-button mt-1">
        <button
          onClick={()=>this.setState(prevState => ({ 
            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.minute }: el
            ),
            options: {
              ...prevState.options,           // copy all other key-value pairs of food object
              xaxis: {                     // specific object of food object
                ...prevState.options.xaxis,
                labels: {
                  ...prevState.options.xaxis.labels,
                  formatter: function(val) {
                    return dayjs(val).format('MMM DD HH:mm:ss')
                  } 
                }   // copy all pizza key-value pairs
                       // update value of specific key
              }
            }
              
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          1min
        </button>
        <button
          onClick={()=>this.setState(prevState => ({

            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.hour1 }: el
            )
          
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          1h
        </button>
        <button
          onClick={()=>this.setState(prevState => ({

            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.hour4 }: el
            )
          
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          4h
        </button>
        <button
          onClick={()=>this.setState(prevState => ({

            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.dayChart }: el
            )
          
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          24h
        </button>
        <button 
          onClick={()=>this.setState(prevState => ({

            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.weekChart }: el
            )
          
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          7d
        </button>
        <button
          onClick={()=>this.setState(prevState => ({

            series: prevState.series.map(
              el => el.name=== 'candle'? { ...el, data: this.props.data.yearChart }: el
            )
          
          }))}
          className="btn btn-outline-secondary btn-sm mx-1 btn btn-light"
        >
          1y
        </button>
      </div>
     </div>
     </div>
      );
    }
  }
export default ApexChart; 