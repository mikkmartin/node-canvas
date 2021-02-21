import { FC } from 'react'
import { WireT } from './ContainerContext'
import { motion } from 'framer-motion'

export const Wire: FC<WireT> = ({ children, ...rest }) => {
  return <motion.line {...rest} strokeWidth="1.5" stroke="red" />
}
