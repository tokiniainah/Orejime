<?php
/**
 * Guerande cookie consent
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Henaff Recaptcha Class
 */
class HEnaff_Orejime extends Module
{
    private $_html = '';

    /**
     * Class constructor
     * @method __construct
     */
    public function  __construct ()
    {
        $this->name = 'henaff_orejime';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Henaff & Co';
        $this->need_instance = 1;
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = 'Orejime';
        $this->description = $this->l('Cookie consent hook wrapper');
        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
    }

    /**
     * Install Module
     * @return bool
     */
    public function install ()
    {
        return parent::install()
          && $this->registerHook('header')
          && Configuration::updateValue('OREJIME_ENABLE', 0)
          && Configuration::updateValue('ENABLE_GOOGLE_ANALYTICS', 0)
          && Configuration::updateValue('GOOGLE_ANALYTICS_KEY', 0);
    }

    /**
     * Uninstall Module
     * @return bool
     */
    public function uninstall ()
    {
        return parent::uninstall()
            && Configuration::deleteByName('OREJIME_ENABLE');
    }

    /**
     * Hook Header
     */
    public function hookHeader ($params)
    {
        if (Configuration::get('OREJIME_ENABLE') == 1) {
            $this->context->controller->registerStylesheet(
                'orejime-stylesheet',
                $this->_path. 'assets/orejime.css',
                [
                    'inline' => true,
                    'media' => 'all',
                    'server' => 'local'
                ]
            );

            /* $this->context->controller->registerJavascript(
                'orejime-script',
                $this->_path. 'assets/orejime.js',
                [
                    'attributes' => 'async',
                    'position' => 'bottom',
                    'server' => 'local'
                ]
            );

            $this->context->controller->registerJavascript(
                'polyfill',
                'https://polyfill.io/v3/polyfill.min.js?flags=gated',
                [
                    'attributes' => 'async',
                    'position' => 'bottom',
                    'server' => 'remote'
                ]
            );*/

            /*$this->context->controller->registerJavascript(
                'orejime-remote-script',
                'https://unpkg.com/orejime@1.2.3/dist/orejime.js',
                [
                    'attributes' => 'async',
                    'position' => 'bottom',
                    'server' => 'remote'
                ]
            );*/
        }

        $this->smarty->assign(
            array(
                'orejime' => Configuration::get('OREJIME_ENABLE'),
                'google_analytics' => Configuration::get('ENABLE_GOOGLE_ANALYTICS'),
                'google_analytics_id' => Configuration::get('GOOGLE_ANALYTICS_KEY')
            )
        );

        return $this->display(__FILE__, 'configuration.tpl');
    }

    /**
     * Module Configuration in Back Office
     */
    public function getContent()
    {
        $this->_html .= $this->_postProcess();
        $this->_html .= $this->renderForm();

        return $this->_html;
    }

    /**
     * Post Process in back office
     */
    protected function _postProcess()
    {
        if (Tools::isSubmit('SubmitOrejimeConfiguration')) {
            Configuration::updateValue('OREJIME_ENABLE', (int)Tools::getValue('OREJIME_ENABLE'));
            Configuration::updateValue('ENABLE_GOOGLE_ANALYTICS', (int)Tools::getValue('ENABLE_GOOGLE_ANALYTICS'));
            Configuration::updateValue('GOOGLE_ANALYTICS_KEY', Tools::getValue('GOOGLE_ANALYTICS_KEY'));

            $this->_html .= $this->displayConfirmation($this->l('Settings updated'));
        }
    }

    /**
     * Admin Form for module Configuration
     */
    public function renderForm()
    {
        $fields_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Orejime Configuration'),
                    'icon' => 'icon-cogs'
                ),
                'tabs' => array(
                    'general' => $this->l('General configuration'),
                    'analytics' => $this->l('Google analytics configuration')
                ),
                'description' => $this->l('For more information about "Google Analytics" please click on the link') . '<br /><a href="https://developers.google.com/analytics" target="_blank">https://developers.google.com/analytics</a>',
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Enable Orejime'),
                        'name' => 'OREJIME_ENABLE',
                        'required' => true,
                        'class' => 't',
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                        'tab' => 'general',
                    ),
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Enable google analytics'),
                        'name' => 'ENABLE_GOOGLE_ANALYTICS',
                        'required' => false,
                        'class' => 't',
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ),
                        ),
                        'tab' => 'analytics',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('google analytics key (Site key)'),
                        'name' => 'GOOGLE_ANALYTICS_KEY',
                        'required' => false,
                        'empty_message' => $this->l('Please fill the google analytics key'),
                        'tab' => 'analytics',
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'class' => 'btn btn-default pull-right',
                )
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'SubmitOrejimeConfiguration';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false) . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = [
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        ];

        return $helper->generateForm(array($fields_form));
    }

    /**
     * Get config values to hydrate the helperForm
     */
    public function getConfigFieldsValues()
    {
        return array(
            'OREJIME_ENABLE' => Tools::getValue('OREJIME_ENABLE', Configuration::get('OREJIME_ENABLE')),
            'ENABLE_GOOGLE_ANALYTICS' => Tools::getValue('ENABLE_GOOGLE_ANALYTICS', Configuration::get('ENABLE_GOOGLE_ANALYTICS')),
            'GOOGLE_ANALYTICS_KEY' => Tools::getValue('GOOGLE_ANALYTICS_KEY', Configuration::get('GOOGLE_ANALYTICS_KEY'))
        );
    }
}
