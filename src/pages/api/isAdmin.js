import {
  ADMIN_EMAIL
} from '../../../services/constants';

export default function handler(req, res) {
  res.status(200).json({data: ADMIN_EMAIL.indexOf(req.query.email) > -1});
}
