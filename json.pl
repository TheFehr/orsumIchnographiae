use JSON;

my $json_obj = new JSON;

## Build some Perl data
my %perl_data;
my @friends1 = qw[Shabbir Anjan Sajal Navin];
my @friends2 = qw[Sanket Taneesha Sreekutty];

$perl_data{Pradeep} = { locale => 'en_IN', friends => \@friends1 };
$perl_data{Anjali} = { locale => 'en_IN', friends => \@friends2 };

print $json_obj->pretty->encode(\%perl_data);