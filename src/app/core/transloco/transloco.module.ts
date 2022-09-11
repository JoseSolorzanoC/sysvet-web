import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
    Translation,
    translocoConfig,
    TranslocoModule,
    TranslocoService,
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import { environment } from 'environments/environment';
import moment from 'moment';

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'es',
                        label: 'Spanish',
                    },
                ],
                defaultLang: 'es',
                fallbackLang: 'es',
                reRenderOnLangChange: true,
                prodMode: environment.production,
            }),
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader,
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory:
                (translocoService: TranslocoService): any =>
                (): Promise<Translation> => {
                    const defaultLang = translocoService.getDefaultLang();
                    moment.locale(defaultLang);
                    translocoService.setActiveLang(defaultLang);
                    return translocoService.load(defaultLang).toPromise();
                },
            multi: true,
        },
    ],
})
export class TranslocoCoreModule {}
