# Kubernetes Config

## Directory Structure

```

|─── chart (k8s configs ie deployment, service, etc)
|     |─── api
|     |─── db
|     |─── ui
|─── envs
|     |─── dev (dev specific values, secrets, etc)
|           |─── api
|           |─── db
|           |─── ui
|     |─── prod (prod specific values, secrets, etc)
|           |─── api
|           |─── db
|           |─── ui
```

## Deployment

To update or spin up any of the components:

1. Ssh into the bastion (t1cg-ss-bastion)
2. Cd into the tsheetv2/.kubernetes directory
3. Ensure that you have the correct branch and git pull
4. Run the following helm command(s):

a. **Deploying to dev**

```
UI  | helm upgrade --install tsheetv2-ui -ntsheetv2 charts/ui/ -f envs/dev/ui.yaml --set image=sprint
API | helm upgrade --install tsheetv2-api -ntsheetv2 charts/api/ -f envs/dev/api.yaml --set image=sprint
DB  | helm upgrade --install tsheetv2-db -ntsheetv2 charts/db/ -f /envs/dev/db.yaml
```

b. **Deploying to prod**

```
UI  | helm upgrade --install tsheetv2-ui -ntsheetv2 charts/ui/ -f envs/prod/ui.yaml --set image=<image tag>
API | helm upgrade --install tsheetv2-api -ntsheetv2 charts/api/ -f envs/prod/api.yaml --set image=<image tag>
DB  | helm upgrade --install tsheetv2-db -ntsheetv2 charts/db/ -f /envs/prod/db.yaml
```
