import { createClient } from 'redis';

const client = createClient({
    password: 'VDuu1LMy7WbpcAHrs9uIkLqDmqlBQKRM',
    socket: {
        host: 'redis-17083.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17083
    }
});

await client.set("name", "Gauhar")
const res = await client.get("name")

console.log(res)