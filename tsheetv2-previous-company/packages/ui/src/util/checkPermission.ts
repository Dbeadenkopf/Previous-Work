const checkPermission = (requiredPermissions: string[], userPermissions: string[]) => {
  let has = true;
  has &&
    requiredPermissions.map((r: string) => {
      if (!(userPermissions.indexOf(r) >= 0)) {
        has = false;
      }
    });
  return has;
};

export default checkPermission;
