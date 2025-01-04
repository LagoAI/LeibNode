import { withApiMiddleware } from '@/middleware/api'
import { nodeService } from '@/lib/api/services/nodes'

export default withApiMiddleware(async (req, res) => {
  const { id } = req.query
  const { method } = req

  switch (method) {
    case 'GET':
      const node = await nodeService.getNodeStatus(id as string)
      res.json({ success: true, data: node })
      break

    case 'PUT':
      const updatedNode = await nodeService.updateNode(id as string, req.body)
      res.json({ success: true, data: updatedNode })
      break

    case 'DELETE':
      await nodeService.deleteNode(id as string)
      res.json({ success: true })
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({
        success: false,
        error: `Method ${method} Not Allowed`
      })
  }
}) 