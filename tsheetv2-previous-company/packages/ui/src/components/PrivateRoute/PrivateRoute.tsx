import * as React from 'react';
import {Outlet, RouteProps} from 'react-router-dom';

interface ReactProps {
  hasPermission: boolean;
}

type Props = ReactProps & RouteProps;

const PrivateRoute = ({hasPermission}: Props) => (hasPermission ? <Outlet /> : <p>403 Forbidden</p>);

export default PrivateRoute;
