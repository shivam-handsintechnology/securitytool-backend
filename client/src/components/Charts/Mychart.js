import React from 'react'
import Chart3 from './Chart3'
import Chart2 from './Chart2'
import Chart4 from './Chart4'
import Chart5 from './Chart5'
import Chart6 from './Chart6'
import Chart7 from './Chart7'

const MyChart = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
         
          <div className='col-lg-6 mb-2'>
            <Chart2 />
          </div>
          <div className='col-lg-6 mb-2'>
            <Chart3 />
          </div>
          <div className='col-lg-6 mb-2'>
            <Chart4 />
          </div>
          <div className='col-lg-6 mb-2'>
            <Chart5 />
          </div>
          <div className='col-lg-6 mb-2'>
            <Chart6 />
          </div>
          <div className='col-lg-6 mb-2'>
            <Chart7 />
          </div>
        </div>
        <div className='row'>
          <div class="col-lg-6 panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                    Collapsible Group 1</a>
                </h4>
              </div>
             
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                    Collapsible Group 2</a>
                </h4>
              </div>
              <div id="collapse2" class="panel-collapse collapse">
                <div class="panel-body"><Chart2 /></div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                    Collapsible Group 3</a>
                </h4>
              </div>
              <div id="collapse3" class="panel-collapse collapse">
                <div class="panel-body"><Chart3 /></div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">
                    Collapsible Group 4</a>
                </h4>
              </div>
              <div id="collapse6" class="panel-collapse collapse in">
                <div class="panel-body"><Chart4 /></div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">
                    Collapsible Group 5</a>
                </h4>
              </div>
              <div id="collapse7" class="panel-collapse collapse">
                <div class="panel-body"><Chart5 /></div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse8">
                    Collapsible Group 6</a>
                </h4>
              </div>
              <div id="collapse8" class="panel-collapse collapse">
                <div class="panel-body"><Chart6 /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default MyChart;
