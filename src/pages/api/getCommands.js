import {
  COMMANDS,
} from '../../../services/constants';

export default function handler(req, res) {
  res.status(200).json({data: COMMANDS});
}