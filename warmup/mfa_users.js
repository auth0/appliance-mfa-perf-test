var mfadb = db.getSiblingDB('mfa');
var auth0db = db.getSiblingDB('auth0');

var user_mfa_orig = {
	"_id" : "gusr_1Mhn0jzGAbUsVjbB",
	"external_user_id" : "auth0|595293740e6e1143446edff6",
	"tenant" : "tehsis-tenant-mfa",
	"created_at" : ISODate("2017-06-27T17:18:47.971Z")
}

var device_account_orig = {
	"tenant" : "tehsis-tenant-mfa",
	"user_id" : "gusr_GPJLhUAkDokhFhOo",
	"enrollment_source_type" : "self_enrollment",
	"user_id_source" : "internal",
	"status" : "confirmed",
	"enrolled_at" : ISODate("2017-06-26T20:57:28.787Z"),
	"enrollment_tx" : {
		"id" : "DGJpc3zVlDrpUKRzUwUu11x9CQEiItHg"
	},
	"recovery_code" : "$2a$10$ucEHPvlEJVwK.X2KTpTMCOTpnweyNSMk5Vo0ieM5Rtl5NaiKpmjTK",
	"created_at" : ISODate("2017-06-26T20:53:26.665Z"),
	"_enc_otp_secret" : "3.0$d4d9a8dd8b8b036a30b1515036591f0e948a9a527e10b9e5de44fe249589d24b$c30575695ffa8c16628dde36$e9bf6d1ce4550e5350fda5db6aed9a41",
	"push_credentials" : null,
	"phone_number" : "+54 9 1166786770",
	"otp_counter" : 10,
	"otp_last_generated_at" : ISODate("2017-06-26T21:59:45.100Z"),
	"otp_last_entry_point" : 9,
	"used_codes" : [
		"361574"
	],
	"last_auth" : ISODate("2017-06-26T22:01:40.449Z")
}

var usersMFS_orig = {
	"__tenant" : "tehsis-tenant-mfa",
	"clientID" : "IdlBiuEzKhMix7c0XiWCIhKg_SXwP4b-",
	"user_id" : "auth0|59517444fbf80a2d1e30202f",
	"guardian" : {
		"guardian_user_id" : "gusr_GPJLhUAkDokhFhOo"
	}
}

var i;
for(i=1;i<1000;i++) {
  print("Saving user: " + i)
   var user = auth0db.users.findOne({
     email: "perf-" + i + "@test.com"
   });

   var user_mfa = Object.extend({}, user_mfa_orig);
   user_mfa.external_user_id = user.user_id;
   user_mfa._id = user_mfa._id.slice(0, -1) + i;

   var userMFS = Object.extend({}, usersMFS_orig);
   userMFS.user_id = user.user_id;
   userMFS.guardian.guardian_user_id = user_mfa._id;

   var device_account = Object.extend({}, device_account_orig);
   device_account.user_id = user_mfa._id;
   device_account.phone_number = "test-perf-" + i;


   auth0db.usersMFS.save(userMFS);
   mfadb.users.save(user_mfa);
   mfadb.device_accounts.save(device_account);
}