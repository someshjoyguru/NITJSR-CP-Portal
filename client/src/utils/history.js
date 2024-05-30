import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

const history = useRouterHistory(createHistory)({
    basename: '/'
});

export default history;
