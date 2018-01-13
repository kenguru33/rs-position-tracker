## OPTIONAL ENVIROMENTS VARIABLES:

* AIS_DATA_STORED_IN_DAYS (default: 14)
* AIS_DATA_FETCH_INTERVAL (default: 10000)
* MAX_TIME_WINDOW_IN_MINUTES (default: 40)
* PORT (default: 3000)
* LOG_LEVEL (default: error)

Specify at least one:

* ENABLE_AIS_FETCHER (default: false)
* ENABLE_API (default: false)

## MANDATORY ENVRONMENTS VARIABLES

* AIS_DATA_URL (default: <not set>)
* DB_URI (default: <not set>)

## Examples:

```
docker run kenguru33/rs-position-tracker -e DB_URI=mongodb://mongodb/mydb -e AIS_DATA_URL=https://ais.rs.no/aktive_pos.json
```

### docker-compose example:

### dev setup:

```
docker-compose up --build
```

### prod setup (swarm mode):

```
docker-compose stack deploy -c docker-compose.yml rs-position-tracker
```
