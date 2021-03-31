import React from 'react'

import { getData } from './utils'

import './app.css'

export default () => {
    return <div className="container">
        <h1>Hello World</h1>
        <h4>{getData()}</h4>
    </div>
}