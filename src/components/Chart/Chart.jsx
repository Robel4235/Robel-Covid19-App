import React, {useEffect, useState} from 'react';
import { fetchDaily } from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart=({data,country})=>{
    const [dailyData, setDailyData]=useState([]);

    useEffect(()=>{
        const fetchFromApi = async ()=> {
            setDailyData (await fetchDaily());
        }
        fetchFromApi();
    }, []);

    const lineChart = (
        dailyData.length!==0?
        (
        <Line
          data={{
              labels: dailyData.map(({date})=>date),
              datasets:[{
                  data: dailyData.map(({confirmed})=>confirmed),
                  label: 'Infected',
                  borderColor: 'hsla(240, 49%, 43%, 0.502)',
                  fill: true,
              }, {
                data: dailyData.map(({deaths})=>deaths),
                label: 'Deaths',
                borderColor: 'hsla(0, 80%, 52%, 0.502)',
                fill: true,
              }],
          }}/>):null

    );

    const barChart = (
        data.confirmed?
        (<Bar
           data ={{
               labels :['Infected', 'Recovered', 'Deaths'],
               datasets:[{
                   label: 'People',
                   backgroundColor:['hsla(240, 49%, 43%, 0.502)',
                                    'rgba(201, 230, 73, 0.502)',
                                    'hsla(0, 80%, 52%, 0.502)'],
                   data: [data.confirmed.value, data.recovered.value, data.deaths.value]
               }]

           }}
           options={{
               legend: {display: false},
               title : {display: true, text:`Current state in ${country}`}
           }}
        
        
        
        />):
        null
    )

    return(
        <div className={styles.container}>
            {country? barChart:lineChart}
        </div>
    )
}
export default Chart;