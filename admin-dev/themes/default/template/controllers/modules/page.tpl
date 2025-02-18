{*
* 2007-2016 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2016 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}
{$kpis}
{if $add_permission eq '1'}
  <div id="module_install" class="row" style="{if !isset($smarty.post.downloadflag)}display: none;{/if}">
    <div class="panel col-lg-12">
      <form action="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}" method="post"
            enctype="multipart/form-data" class="form-horizontal">
        <h3>{l s='Add a new module'}</h3>
        {if !ini_get('file_uploads')}
          <div class="alert alert-danger">{l s='File uploads have been turned off. Please ask your webhost to enable file uploads (%s).' sprintf=['<code>file_uploads = on</code>']}</div>
        {else}
          <p class="alert alert-info">{l s='The module must either be a Zip file (.zip) or a tarball file (.tar, .tar.gz, .tgz).'}</p>
          <div class="form-group">
            <label for="file" class="control-label col-lg-3">
              <span class="label-tooltip" data-toggle="tooltip" title="{l s='Upload a module from your computer.'}">
                {l s='Module file'}
              </span>
            </label>
            <div class="col-sm-9">
              <div class="row">
                <div class="col-lg-7">
                  <input id="file" type="file" name="file" class="hide"/>
                  <div class="dummyfile input-group">
                    <span class="input-group-addon"><i class="icon-file"></i></span>
                    <input id="file-name" type="text" class="disabled" name="filename" readonly/>
                    <span class="input-group-btn">
                      <button id="file-selectbutton" type="button" name="submitAddAttachments" class="btn btn-default">
                        <i class="icon-folder-open"></i> {l s='Choose a file'}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-9 col-lg-push-3">
              <button class="btn btn-default" type="submit" name="download">
                <i class="icon-upload-alt"></i>
                {l s='Upload this module'}
              </button>
            </div>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}
{if $upgrade_available|@count}
  <div class="alert alert-info">
    {l s='An upgrade is available for some of your modules!'}
    <ul>
      {foreach from=$upgrade_available item='module'}
        <li>
          <a href="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;anchor={$module.anchor|escape:'html':'UTF-8'}"><b>{$module.displayName|escape:'html':'UTF-8'}</b></a>
        </li>
      {/foreach}
    </ul>
  </div>
{/if}
<div class="panel">
  <div class="panel-heading">
    <i class="icon-list-ul"></i>
    {l s='Modules list'}
  </div>
  <!--start sidebar module-->
  <div class="row">
    <div class="categoriesTitle col-md-3">
      <div class="list-group">
        <form id="filternameForm" method="post" class="list-group-item form-horizontal">
          <div class="input-group">
            <span class="input-group-addon">
              <i class="icon-search"></i>
            </span>
            <input class="form-control" placeholder="{l s='Search'}" type="text" value="" name="moduleQuicksearch"
                   id="moduleQuicksearch" autocomplete="off"/>
          </div>
        </form>
        <a class="categoryModuleFilterLink categoryModuleFilterLinkPremium list-group-item {if $selectedCategory === AdminModulesController::CATEGORY_PREMIUM}active{/if}"
            href="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;filterCategory={AdminModulesController::CATEGORY_PREMIUM}"
            id="filter_premium">
            <span class="filter-premium-icon"></span>
            <span class="filter-premium-text">{l s='Premium Modules'}</span>
            <span id="premium-count">{$nb_modules_premium}</span>
        </a>
        <a class="categoryModuleFilterLink list-group-item {if $selectedCategory === AdminModulesController::CATEGORY_FAVORITES}active{/if}"
           href="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;filterCategory={AdminModulesController::CATEGORY_FAVORITES}"
           id="filter_favorite">
          {l s='Favorites'} <span id="favorite-count" class="badge pull-right">{$nb_modules_favorites}</span>
        </a>
        <a class="categoryModuleFilterLink list-group-item {if $selectedCategory === AdminModulesController::CATEGORY_ALL}active{/if}"
           href="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;filterCategory={AdminModulesController::CATEGORY_ALL}"
           id="filter_all">
          {l s='All'} <span class="badge pull-right">{$nb_modules}</span>
        </a>
        {foreach from=$list_modules_categories item=module_category key=module_category_key}
          <a class="categoryModuleFilterLink list-group-item {if $selectedCategory == $module_category_key}active{/if}"
             href="{$currentIndex|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;filterCategory={$module_category_key}"
             id="filter_{$module_category_key}">
            {$module_category.name} <span class="badge pull-right">{$module_category.nb}</span>
          </a>
        {/foreach}
      </div>
    </div>
    <div id="moduleContainer" class="col-md-9">
      {include file='controllers/modules/list.tpl'}
    </div>
  </div>
</div>
<script type="text/javascript">
  $(document).ready(function () {
    $('#file-selectbutton').click(function (e) {
      $('#file').trigger('click');
    });
    $('#file-name').click(function (e) {
      $('#file').trigger('click');
    });
    $('#file').change(function (e) {
      var val = $(this).val();
      var file = val.split(/[\\/]/);
      $('#file-name').val(file[file.length - 1]);
    });
  });
</script>
