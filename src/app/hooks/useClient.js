import { useContext } from 'react'
import ClientContext from 'app/contexts/ClientContext'

const useClient = () => useContext(ClientContext)

export default useClient
