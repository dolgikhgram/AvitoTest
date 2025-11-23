import { useQuery } from '@tanstack/react-query'
import { getModeratorInfo } from '../moderator'

export const useModerator = () => {
  return useQuery({
    queryKey: ['moderator', 'me'],
    queryFn: getModeratorInfo,
  })
}
