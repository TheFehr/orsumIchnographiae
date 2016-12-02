#!/usr/bin/perl
#use warnings;

#my $dbh;
#sub connect {	
#	my ($db_user, $db_name, $db_pass) = ('3i', 'orsumIchnographiae', 'wurst');
#	$dbh = DBI->connect("DBI:mysql:database=$db_name", $db_user, $db_pass);
#}

#sub selectEvents {
#	$statement = $dbh->prepare('SELECT * FROM events');
# 	$statement->execute() or die $statement->err_str;
# 	
# 	return $statement;
# }
package Handler;
use strict;
use warnings;
use Exporter;

our @ISA= qw( Exporter );

# these CAN be exported.
our @EXPORT_OK = qw( export_me export_me_too );

# these are exported by default.
our @EXPORT = qw( export_me );

sub hello {
	print "Hallo";
}