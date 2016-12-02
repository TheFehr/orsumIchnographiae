#!/usr/bin/perl
use v5.10.0;
use warnings;
use DBI;
use diagnostics;
use CGI;
use JSON;

print "Content-Type: text/html\n\n";

sub selectEvents {
	my $db = shift;
	my $stmt = $db->prepare('SELECT * FROM events');
	$stmt->execute() or die $stmt->err_str;
	
	return $stmt;
}


my ($db_user, $db_name, $db_pass) = ('3i', 'orsumIchnographiae', 'wurst');
my $db = DBI->connect("DBI:mysql:database=$db_name", $db_user, $db_pass);

$statement = selectEvents($db);

print "<html><head></head><body>";

my $json_obj = new JSON;

## Build some Perl data
my %perl_data;
my @friends1 = qw[Shabbir Anjan Sajal Navin];
my @friends2 = qw[Sanket Taneesha Sreekutty];

$perl_data{Pradeep} = { locale => 'en_IN', friends => \@friends1 };
$perl_data{Anjali} = { locale => 'en_IN', friends => \@friends2 };

print $json_obj->pretty->encode(\%perl_data);

while (my ($col_1, $col_2, $col_3, $col_4) = $statement->fetchrow_array() ) {
    print "<ul><li>Spalte 1: $col_1 \n</li>";
    print "<li>Spalte 2: $col_2 \n</li>";
    print "<li>Spalte 3: $col_3 \n</li>";
    print "<li>Spalte 4: $col_4 \n</li></ul>";
}

print "</body></html>";
