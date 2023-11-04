import pymysql

timeout = 10
class Connection:
    connection = pymysql.connect(
        charset="utf8mb4",
        connect_timeout=timeout,
        cursorclass=pymysql.cursors.DictCursor,
        db="defaultdb",
        host="mysql-d51f41f-nathan-a42e.a.aivencloud.com",
        password="AVNS_3kWPcqsUyzZ8o_Ylw1a",
        read_timeout=timeout,
        port=21984,
        user="avnadmin",
        write_timeout=timeout,
    )