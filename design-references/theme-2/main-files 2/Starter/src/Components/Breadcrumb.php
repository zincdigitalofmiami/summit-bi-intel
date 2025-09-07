<?php

namespace App\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('breadcrumb')]
class Breadcrumb
{
	public string $title = '';
	public string $pagetitle = '';
}