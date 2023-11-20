import React from 'react'
import PropTypes from 'prop-types'

const Header = ({text}) => {
  return (
    <h1 className={headerClass}>
      {text}
    </h1>
  )
}
const headerClass = "text-5xl lg:pt-12 lg:pb-24 flex-col flex items-center"

Header.defaultProps = {
  text: 'Innstillinger',
}

Header.protoTypes = {
  text: PropTypes.string,
}

export default Header
