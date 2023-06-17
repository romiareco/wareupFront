import { useContext } from 'react'
import UserContext from 'app/contexts/UserContext'

const useUser = () => useContext(UserContext)

export default useUser
