const oracledb = require('oracledb');
const logger = require('../system/logger');
const oracleConfig = require('../system/getCfg').dbConfig.oracle;
const oracleLibDir = '/oracle/instantclient_19_3'; // 개별 lib 설정

const initOracle = async () => {
    try {
        await oracledb.initOracleClient({ libDir: oracleLibDir });
    } catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
    }
};

/*
oracledb.BIND_IN => default
val => value
type => oracledb.STRING, oracledb.NUMBER, oracledb.DATE or oracledb.BUFFER, oracledb.BLOB or oracledb.CLOB
const result = await connection.execute(
  `INSERT INTO countries VALUES (:country_id, :country_name)`,
  {
    country_id: { dir: oracledb.BIND_IN, val: 90, type: oracledb.NUMBER },
    country_name: { dir: oracledb.BIND_IN, val: "Tonga", type: oracledb.STRING }
  }
);
*/
/**
 * @description database 쿼리 요청(oracle)
 * @param {*} queryString 쿼리 string 데이터
 * @param {*} params 쿼리 파라미터
 * @returns {Object} 결과 데이터
 */
const oracleConnections = async (queryString, params) => {
    let conn;
    try {
        // function(Error error, Pool pool) => return connection pool object.
        // Pool object obtains connections to the Oracle database using the getConnection() method
        // 이미 열려진 pool 이 있으면 그걸 다시 리턴함.
        const pool = await oracledb.createPool(oracleConfig[0]);
        // oracledb => getConnection
        conn = await pool.getConnection();
        let rslt = await conn.execute(queryString, params, { outFormat: oracledb.OBJECT });
        console.log('===>', rslt);
        return rslt;
    } catch (error) {
        logger.error(`oracle query error => ${error}`);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

const query_select = `SELECT SEQ_NUM, CALLED_NUM FROM WOONGC.TEST_CALLED WHERE SEQ_NUM = :country_id`;
const param = { country_id: { val: 123, type: oracledb.NUMBER } };

// oracle client instance init.
initOracle();
setTimeout(() => {
    oracleConnections(query_select, param);
}, 5000);

// connection 확인
//oracleConnections();
//ss
/*
oracleConfig.map(async (eachServer) => {
    // console.log('>>>---------------------------')
    console.log(eachServer);
    // const obj_eachServer = JSON.parse(eachServer)
    //console.log(eachServer)
    console.log('---------------------------<<\n');
    try {
        await oracle.createPool(eachServer);
        const alias = eachServer.poolAlias;
        logger.info("oracle ok / db alias['" + alias + "']");

        setInterval(async () => {
            console.log("db alias['" + alias + "'] >> ");
            let pool = await oracle.getPool(alias);
            console.log(`poolMax:${pool.poolMax} poolOpen:${pool.connectionsOpen}  poolUse:${pool.connectionsInUse}`);
            let conn = await pool.getConnection();
            let rslt = await conn.execute('select 1 from DUAL', [], { outFormat: oracle.OBJECT });
            await conn.release();
            console.log('ping: ', rslt);
        }, 5000);
    } catch (err) {
        console.log(err);
    }
});
*/
