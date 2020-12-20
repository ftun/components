
/**
* @property string. Variable de entorno del sistema
*/
const ENV = process.env.APP_ENV || 'PRO';

/**
* @author Felipe Tun Cauich <ftun@palaceresorts.com>
* Clase para obtener informacion de las configuraciones del entorno de la aplicacion
*/
class CleverConfig {

	/**
	* Funcion para obtener la url base del Api de un modulo de Clever
	* @param string.
	* @return string.
	*/
	static getApiUrl(module) {
		var urls = CleverConfig.environmentSettings();
		return urls['apiUrl'][module];
	}

	/**
	* Funcion para obtener la url base del frontend de la aplicacion de un modulo de Clever
	* @param string.
	* @return string.
	*/
	static getFeUrl(module) {
		var urls = CleverConfig.environmentSettings();
		return urls['feUrl'][module];
	}

	/**
	* Funcion que retorna un objeto json de las configuracion en base al entorno de la aplicacion
	* @return object.
	*/
	static environmentSettings() {
		var config = {
			'DEV' : {
				'apiUrl' : {
					'booking' : 'http://booking-api-qa.clever.palace-resorts.local',
					'rate': 'http://rates-api-qa.clever.palace-resorts.local',
					'contract' : 'http://contracts-api-qa.clever.palace-resorts.local',
					'wire' : 'http://wire-dev6/WireREST/api',
					'core' : 'http://core-api-qa.clever.palace-resorts.local',
					'auth' : 'http://auth-api-qa.clever.palace-resorts.local',
					'frm' : 'http://frm-api-qa.clever.palace-resorts.local',
					'general' : 'http://dev.clever-api-contracts.local',
					'fin' : 'http://finance-api-qa.clever.palace-resorts.local',
					'products'     : 'http://dev.clever-api-products.local',
					'events'       : 'http://dev.clever-api-events.local',
					'productions'  : 'http://dev.clever-api-productions.local',
					'profile' : 'http://profile-api-qa.clever.palace-resorts.local',
					'sales': 'http://sales-api-qa.clever.palace-resorts.local',
					'supplier'	   : 'http://supplier-api-qa.clever.palace-resorts.local',
					'benefit': 'http://benefit-api-qa.clever.palace-resorts.local',
					'books': 'http://books-api-qa.clever.palace-resorts.local',
					'apiReportPy':'http://report-api-qa.clever.palace-resorts.local',
					'apiAssetsPy':'http://awsutil-api-qa.clever.palace-resorts.local',
					'auth2':'http://10.8.19.232',
					'cleversign' : {
						'url' : 'http://sign-front-qa.clever.palace-resorts.local',
						'user' : 'cleversign',
						'password' : 'yP7e]$~<C/z=74',
					},
					'clever_cms': 'http://localhost:9000',
					'cashflow': 'http://cashflow-api-qa.clever.palace-resorts.local',
					'agency': 'http://agencydirect-api-qa.clever.palace-resorts.local'
				},
				'feUrl' : {
					'core'	   : 'http://localhost:9000',
					'contract' : 'http://contracts-front-qa.clever.palace-resorts.local',
					'events' : 'http://events-front-qa.clever.palace-resorts.local',
					'products' : 'http://products-front-qa.clever.palace-resorts.local',
					'productions' : 'http://productions-front-qa.clever.palace-resorts.local',
					'profile' : 'http://profile-front-qa.clever.palace-resorts.local',
					'leads' : 'http://leads-front-qa.clever.palace-resorts.local',
					'sales' : 'http://sales-front-qa.clever.palace-resorts.local',
					'crm' : 'http://10.8.18.205',
					'proagent' : 'http://proagent-front-qa.clever.palace-resorts.local',
					'supplier' : 'http://supplier-front-qa.clever.palace-resorts.local',
					'benefit': 'http://benefit-front-qa.clever.palace-resorts.local',
					'books': 'http://books-front-qa.clever.palace-resorts.local',
					'clever_cms': 'http://localhost:3000',
					'auth': 'http://auth-front-qa.clever.palace-resorts.local',
					'bengine' : 'http://bengine-admin-qa.clever.palace-resorts.local',
					'cashflow': 'http://cashflow-front-qa.clever.palace-resorts.local'
				}
			},
			'QA' : {
				'apiUrl' : {
					'booking' : 'http://booking-api-qa.clever.palace-resorts.local',
					'rate': 'http://rates-api-qa.clever.palace-resorts.local',
					'contract' : 'http://contracts-api-qa.clever.palace-resorts.local',
					'wire' : 'http://web-asp/BBRest/api',
					'core' : 'http://core-api-qa.clever.palace-resorts.local',
					'auth' : 'http://auth-api-qa.clever.palace-resorts.local',
					'frm' : 'http://frm-api-qa.clever.palace-resorts.local',
					'general' : 'http://contracts-api-qa.clever.palace-resorts.local',
					'fin' : 'http://finance-api-qa.clever.palace-resorts.local',
					'products': 'http://products-api-qa.clever.palace-resorts.local',
					'events': 'http://events-api-qa.clever.palace-resorts.local',
					'productions'  : 'http://productions-api-qa.clever.palace-resorts.local',
					'profile' : 'http://profile-api-qa.clever.palace-resorts.local',
					'sales': 'http://sales-api-qa.clever.palace-resorts.local',
					'supplier'	   : 'http://supplier-api-qa.clever.palace-resorts.local',
					'benefit': 'http://benefit-api-qa.clever.palace-resorts.local',
					'books': 'http://books-api-qa.clever.palace-resorts.local',
					'apiReportPy':'http://report-api-qa.clever.palace-resorts.local',
					'apiAssetsPy':'http://awsutil-api-qa.clever.palace-resorts.local',
					'auth2':'http://10.8.19.232',
					'cleversign' : {
						'url' : 'http://sign-front-qa.clever.palace-resorts.local',
						'user' : 'cleversign',
						'password' : 'yP7e]$~<C/z=74',
					},
					'clever_cms': 'http://localhost:9000',
					'cashflow': 'http://cashflow-api-qa.clever.palace-resorts.local',
					'agency': 'http://agencydirect-api-qa.clever.palace-resorts.local'
				},
				'feUrl' : {
					'core'	   : 'http://front-qa.clever.palace-resorts.local',
					'contract' : 'http://contracts-front-qa.clever.palace-resorts.local',
					'events' : 'http://events-front-qa.clever.palace-resorts.local',
					'products' : 'http://products-front-qa.clever.palace-resorts.local',
					'productions' : 'http://productions-front-qa.clever.palace-resorts.local',
					'profile' : 'http://profile-front-qa.clever.palace-resorts.local',
					'leads' : 'http://leads-front-qa.clever.palace-resorts.local',
					'sales' : 'http://sales-front-qa.clever.palace-resorts.local',
					'crm' : 'http://10.8.18.205',
					'proagent' : 'http://proagent-front-qa.clever.palace-resorts.local',
					'supplier' : 'http://supplier-front-qa.clever.palace-resorts.local',
					'benefit': 'http://benefit-front-qa.clever.palace-resorts.local',
					'books': 'http://books-front-qa.clever.palace-resorts.local',
					'clever_cms': 'http://localhost:3000',
					'auth': 'http://auth-front-qa.clever.palace-resorts.local',
					'bengine' : 'http://bengine-admin-qa.clever.palace-resorts.local',
					'cashflow': 'http://cashflow-front-qa.clever.palace-resorts.local'
				}
			},
			'PRO' : {
				'apiUrl' : {
					'booking' : 'http://booking-api.clever.palace-resorts.local',
					'contract' : 'http://contracts-api.clever.palace-resorts.local',
			        'wire' : 'http://web-asp/BBRest/api',
			        'core' : 'http://core-api.clever.palace-resorts.local',
					'auth' : 'http://auth-api.clever.palace-resorts.local',
					'auth2' : 'http://auth2-api.clever.palace-resorts.local',
			        'frm' : 'http://frm-api.clever.palace-resorts.local',
			        'general' : 'http://contracts-api.clever.palace-resorts.local',
			        'fin' : 'http://finance-api.clever.palace-resorts.local',
					'profile' : 'http://10.8.17.196',
					'sales': 'http://sales-api.clever.palace-resorts.local',
			        'events': 'http://events-api.clever.palace-resorts.local',
					'products': 'http://products-api.clever.palace-resorts.local',
					'productions'  : 'http://productions-api.clever.palace-resorts.local',
					'supplier'	   : 'http://supplier-api.clever.palace-resorts.local',
					'benefit': 'http://benefit-api.clever.palace-resorts.local',
					'books': 'http://books-api.clever.palace-resorts.local',
					'apiReportPy':'http://report-api.clever.palace-resorts.local',
					'apiAssetsPy':'http://awsutil-api.clever.palace-resorts.local',
			        'cleversign' : {
			            'url' : 'https://sign.palaceresorts.com',
			            'user' : 'cleversign',
			            'password' : 'yP7e]$~<C/z=74',
			        },
			        'clever_cms': 'http://localhost:9000',
					'cashflow': 'http://cashflow-api.clever.palace-resorts.local',
					'agency': 'http://agencydirect-api.clever.palace-resorts.local'
				},
				'feUrl' : {
					'core'	   : 'http://front.clever.palace-resorts.local',
					'contract' : 'http://contracts-front.clever.palace-resorts.local',
					'events' : 'http://events-front.clever.palace-resorts.local',
					'products' : 'http://products-front.clever.palace-resorts.local',
					'productions' : 'http://productions-front.clever.palace-resorts.local',
					'profile' : 'http://profile-front.clever.palace-resorts.local',
					'leads' : 'http://leads-front.clever.palace-resorts.local',
					'sales' : 'http://sales-front.clever.palace-resorts.local',
					'crm' : 'http://10.8.19.17',
					'proagent' : 'http://proagent-front.clever.palace-resorts.local',
					'supplier' : 'http://suppliers-front.clever.palace-resorts.local',
					'benefit' : 'http://benefit-front.clever.palace-resorts.local',
					'books': 'http://books-front.clever.palace-resorts.local',
					'clever_cms': 'http://localhost:3000',
					'auth': 'http://auth-front.clever.palace-resorts.local',
					'bengine' : 'http://bengine-admin.clever.palace-resorts.local',
					'cashflow': 'http://cashflow-front.clever.palace-resorts.local'
				}
			},
		};

		return config[ENV];
	}
}

module.exports = CleverConfig;// require('../../../../config/CleverConfig');
