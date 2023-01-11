import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service';
import { utilService } from '../services/util.service';
import { loadToys } from '../store/toy.action';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const [labelsToy, setLabels] = useState(null) 

  useEffect(() => {
    loadToys().then(
    toyService.getLabels()
    .then((labels) => setLabels(labels))
    .catch(err => {
        console.log('Error:', err)
    })
    )
    
}, [])

function getInStockDataLabels() {
  if(!labelsToy || !toys) return []
  return labelsToy.map(label => {
    return countInStockLabel(label)})
}

function getPriceLabels() {
  if(!labelsToy || !toys) return []
  return labelsToy.map(label => {
    return getAveragePrice(label)})
}

  function countInStockLabel(label) {
    if(!label || !toys) return 0
    return toys.reduce((acc, toy) => {
      if(toy.labels.includes(label) && toy.inStock) return acc + 1
      return acc
    }, 0)
  }

  function getAveragePrice(label) {
    if(!label || !toys) return 0
    const result = toys.reduce((acc, toy) => {
      if(toy.labels.includes(label)){
        acc.sumPrice += toy.price
        acc.countToy += 1
      } 
      return acc
    }, {sumPrice: 0, countToy: 0})

    return result.sumPrice / result.countToy
  }

  function getRandomColorLabels() {
    if(!labelsToy || !toys) return []
    return labelsToy.map(label => utilService.getRandomColor())
  }

  function createInStockData() {
    return {
            labels: labelsToy,
            datasets: [
            {
              label: '# of in stock',
              data: getInStockDataLabels(),
              backgroundColor: getRandomColorLabels(),
            },
          ],
        }
  }

  function createPriceData() {
    return {
            labels: labelsToy,
            datasets: [
            {
              label: '# of average price',
              data: getPriceLabels(),
              backgroundColor: getRandomColorLabels(),
            },
          ],
        }
  }

  return (
        <section className='dashboard'>
          <div>
            <Doughnut  height='35vh' data={createInStockData()} />
          </div>
          <div>
            <Doughnut height='35vh' data={createPriceData()} />
          </div>
      </section>
  )
  
  
}