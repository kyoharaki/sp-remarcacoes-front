import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import VisualizarPDF from './components/VisualizarPDF'
import { PrivateRoute } from './util/PrivateRoute'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivateRoute>
      <VisualizarPDF />
    </PrivateRoute>
  </React.StrictMode>,
)
