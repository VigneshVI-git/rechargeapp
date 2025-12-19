const dns = require('dns');
const { promisify } = require('util');

const resolveSrv = promisify(dns.resolveSrv);
const resolveTxt = promisify(dns.resolveTxt);

const hostname = 'cluster0.emyfblk.mongodb.net';

async function checkDNS() {
    console.log(`🔍 Checking DNS for ${hostname}...`);

    try {
        console.log('1. Resolving SRV records (_mongodb._tcp)...');
        const srvRecords = await resolveSrv(`_mongodb._tcp.${hostname}`);
        console.log('✅ SRV Records found:', JSON.stringify(srvRecords, null, 2));
    } catch (error) {
        console.error('❌ SRV Resolution Failed:', error.code, error.message);
        console.log('💡 TIP: This usually means your ISP or Firewall is blocking "SRV" DNS queries.');
    }

    try {
        console.log('\n2. Resolving TXT records...');
        const txtRecords = await resolveTxt(hostname);
        console.log('✅ TXT Records found:', JSON.stringify(txtRecords, null, 2));
    } catch (error) {
        console.error('❌ TXT Resolution Failed:', error.code, error.message);
    }
}

checkDNS();
