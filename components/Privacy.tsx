"use client";

import {useState} from "react";
import styles from "@/styles/Privacy.module.css";

interface PrivacyProps {
    id?: string;
    title?: string;
}

export const Privacy = ({id, title}: PrivacyProps) => {
    const [isIndonesian, setIsIndonesian] = useState(false);

    const setLanguage = (lang: string) => {
        setIsIndonesian(lang === 'id');
    };

    return (
        <div className={styles.privacy}>
            <div className={styles.privacyHeader}>
                <button className={`${styles.translateBtn} ${!isIndonesian ? styles.active : ""}`}
                        onClick={() => setLanguage('en')}>EN
                </button>
                <span className={styles.separator}>&nbsp;|&nbsp;</span>
                <button className={`${styles.translateBtn} ${isIndonesian ? styles.active : ""}`}
                        onClick={() => setLanguage('id')}>ID
                </button>
            </div>

            {!isIndonesian ? (
                <>
                    <h1>
                        Privacy Policy {id ? `for ${title}` : ''}
                    </h1>

                    <p><strong>Last updated:</strong> February 03, 2026</p>

                    <p>
                        <em>{id ? title : ''}</em> is a mobile game developed by <strong>mustakuusi</strong>.
                        Your privacy is important to us. This Privacy Policy explains how
                        information is collected, used, and shared when you use our app,
                        including in-app purchases and advertisements.
                    </p>

                    <h2>Game Variations</h2>
                    <p>
                        Some games include Google Play Games features (such as sign-in, achievements, or leaderboards),
                        while others do not. The data collected and shared may vary depending on which features are
                        available in the specific game you are using.
                    </p>

                    <h2>Information Collection and Use</h2>
                    <p>
                        Our app itself does not directly collect personally identifiable information.
                        However, we use third-party services that may automatically collect certain information
                        to provide advertisements, analytics, game features, and in-app purchases, including:
                    </p>
                    <ul>
                        <li>User IDs (via Google Play Games Services, if available)</li>
                        <li>Device identifiers / Advertising ID (via Unity Ads)</li>
                        <li>Crash logs and diagnostics (via Google Play Games and Unity Ads SDKs)</li>
                        <li>Purchase information for in-app purchases (via Google Play Billing)</li>
                    </ul>

                    <h2>Why This Data is Collected and Shared</h2>
                    <p>These data are collected and shared for the following purposes:</p>
                    <ul>
                        <li><strong>App functionality:</strong> To enable sign-in, achievements, leaderboards, purchased
                            features, and other game functionalities.
                        </li>
                        <li><strong>Analytics:</strong> To monitor app performance, diagnose and fix bugs, and improve
                            user experience.
                        </li>
                        <li><strong>Advertising or marketing:</strong> To serve and measure advertisements via Unity
                            Ads.
                        </li>
                        <li><strong>In-app purchases:</strong> To process purchases, unlock purchased content, and
                            restore purchases on the same device or account.
                        </li>
                        <li><strong>Fraud prevention, security, and compliance:</strong> To detect fraud and ensure
                            secure operation of the app.
                        </li>
                        <li><strong>Account management:</strong> To manage user accounts through Google Play Games
                            Services.
                        </li>
                    </ul>

                    <h2>Data Encryption</h2>
                    <p>
                        All data transmitted to third-party services, including purchase and analytics data,
                        is encrypted in transit using industry-standard HTTPS/TLS protocols.
                    </p>

                    <h2>Advertising and Children</h2>
                    <p>
                        Our app uses <strong>Unity Ads</strong> to show advertisements.
                        When the app is used by children under the age of 13 (or the applicable age in your country),
                        Unity Ads will only display <strong>non-behavioral ads</strong>,
                        in compliance with Google Play’s Families Policy.
                        Advertising ID is used for ad measurement, frequency capping, and non-personalized ad serving,
                        and it is <strong>not used to personally identify users</strong>.
                    </p>

                    <h2>In-App Purchases</h2>
                    <p>
                        Our app offers in-app purchases to unlock certain features, such as removing ads.
                        Payments are processed securely through <strong>Google Play</strong>,
                        and we do <strong>not</strong> collect or store your payment information directly.
                        Google may collect purchase-related information according to their{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
                    </p>
                    <p>Purchase data is used to:</p>
                    <ul>
                        <li>Enable purchased features in the app</li>
                        <li>Restore purchases on the same device or account</li>
                    </ul>
                    <p>Users can manage purchases and request refunds through their Google Play account.</p>

                    <h2>Third-Party Services</h2>
                    <p>
                        Our app uses the following third-party services, which may collect and use data according to
                        their own privacy policies:
                    </p>
                    <ul>
                        <li><strong>Unity Ads</strong> – <a href="https://unity.com/legal/privacy-policy"
                                                            target="_blank" rel="noopener">Unity Privacy Policy</a></li>
                        <li><strong>Google Play Games Services</strong> – <a href="https://policies.google.com/privacy"
                                                                             target="_blank" rel="noopener">Google
                            Privacy Policy</a></li>
                        <li><strong>Google Play Billing</strong> – <a href="https://policies.google.com/privacy"
                                                                      target="_blank" rel="noopener">Google Privacy
                            Policy</a></li>
                    </ul>

                    <h2>Opt-Out and Settings</h2>
                    <p>Users can manage or opt out of certain data collection:</p>
                    <ul>
                        <li><strong>Unity Ads:</strong> Follow instructions on the <a
                            href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener">Unity Privacy
                            Policy page</a> to manage ad preferences or opt out of personalized ads.
                        </li>
                        <li><strong>Google Play Games:</strong> Sign out or manage permissions in your Google account
                            settings.
                        </li>
                        <li><strong>In-App Purchases:</strong> Purchases and subscriptions can be managed or refunded
                            via your Google Play account.
                        </li>
                    </ul>

                    <h2>Children’s Privacy</h2>
                    <p>
                        We do not knowingly collect personally identifiable information from children under 13 (or the
                        applicable age in your country).
                        If you believe we have collected personal data from a child, please contact us, and we will take
                        steps to remove it.
                    </p>

                    <h2>Required Data Collection</h2>
                    <p>
                        The collection of the data listed above is required for the app to function properly.
                        Users cannot disable this collection within the app.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us at:<br/>
                        <strong>mustakuusi6@gmail.com</strong>
                    </p>
                </>
            ) : (
                <>
                    <h1>Kebijakan Privasi {id ? `untuk ${title}` : ''}</h1>

                    <p><strong>Pembaruan terakhir:</strong> 03 Februari 2026</p>

                    <p>
                        <em>{id ? title : ''}</em> adalah gim seluler yang dikembangkan oleh <strong>mustakuusi</strong>.
                        Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana informasi
                        dikumpulkan,
                        digunakan, dan dibagikan saat Anda menggunakan aplikasi kami, termasuk pembelian dalam aplikasi
                        dan iklan.
                    </p>

                    <h2>Variasi Gim</h2>
                    <p>
                        Beberapa gim menyertakan fitur Google Play Games (seperti login, pencapaian, atau papan
                        peringkat), sementara yang lain tidak. Data yang dikumpulkan dan dibagikan dapat berbeda
                        tergantung pada fitur yang tersedia di gim yang Anda mainkan.
                    </p>

                    <h2>Pengumpulan dan Penggunaan Informasi</h2>
                    <p>
                        Aplikasi kami tidak secara langsung mengumpulkan informasi pribadi yang dapat diidentifikasi.
                        Namun, kami menggunakan layanan pihak ketiga yang dapat secara otomatis mengumpulkan informasi
                        tertentu
                        untuk menampilkan iklan, analitik, fitur permainan, dan pembelian dalam aplikasi, termasuk:
                    </p>
                    <ul>
                        <li>ID pengguna (melalui Google Play Games Services, jika tersedia)</li>
                        <li>Identitas perangkat / ID iklan (melalui Unity Ads)</li>
                        <li>Log kerusakan dan diagnostik (melalui Google Play Games dan Unity Ads SDK)</li>
                        <li>Informasi pembelian untuk pembelian dalam aplikasi (melalui Google Play Billing)</li>
                    </ul>

                    <h2>Alasan Data Dikumpulkan dan Dibagikan</h2>
                    <p>Data ini dikumpulkan dan dibagikan untuk tujuan berikut:</p>
                    <ul>
                        <li><strong>Fungsi aplikasi:</strong> Untuk mengaktifkan login, pencapaian, papan peringkat,
                            fitur berbayar, dan fungsi permainan lainnya.
                        </li>
                        <li><strong>Analitik:</strong> Untuk memantau performa aplikasi, memperbaiki bug, dan
                            meningkatkan pengalaman pengguna.
                        </li>
                        <li><strong>Iklan atau pemasaran:</strong> Untuk menampilkan dan mengukur iklan melalui Unity
                            Ads.
                        </li>
                        <li><strong>Pembelian dalam aplikasi:</strong> Untuk memproses pembelian, membuka konten
                            berbayar, dan memulihkan pembelian di perangkat atau akun yang sama.
                        </li>
                        <li><strong>Pencegahan penipuan, keamanan, dan kepatuhan:</strong> Untuk mendeteksi penipuan dan
                            memastikan keamanan aplikasi.
                        </li>
                        <li><strong>Manajemen akun:</strong> Untuk mengelola akun pengguna melalui Google Play Games
                            Services.
                        </li>
                    </ul>

                    <h2>Enkripsi Data</h2>
                    <p>
                        Semua data yang dikirim ke layanan pihak ketiga, termasuk data pembelian dan analitik,
                        dienkripsi selama transmisi menggunakan protokol HTTPS/TLS standar industri.
                    </p>

                    <h2>Iklan dan Anak-Anak</h2>
                    <p>
                        Aplikasi kami menggunakan <strong>Unity Ads</strong> untuk menampilkan iklan.
                        Jika digunakan oleh anak-anak di bawah usia 13 tahun (atau usia yang berlaku di negara Anda),
                        Unity Ads hanya akan menampilkan <strong>iklan non-perilaku</strong> sesuai dengan Kebijakan
                        Keluarga Google Play.
                        ID iklan digunakan untuk pengukuran iklan, pembatasan frekuensi, dan penyajian iklan
                        non-pribadi,
                        serta <strong>tidak digunakan untuk mengidentifikasi pengguna secara pribadi</strong>.
                    </p>

                    <h2>Pembelian Dalam Aplikasi</h2>
                    <p>
                        Aplikasi kami menawarkan pembelian dalam aplikasi untuk membuka fitur tertentu, seperti
                        menghapus iklan.
                        Pembayaran diproses dengan aman melalui <strong>Google Play</strong>, dan
                        kami <strong>tidak</strong> mengumpulkan
                        atau menyimpan informasi pembayaran Anda secara langsung. Google dapat mengumpulkan informasi
                        pembelian sesuai{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Kebijakan Privasi
                            mereka</a>.
                    </p>
                    <p>Data pembelian digunakan untuk:</p>
                    <ul>
                        <li>Mengaktifkan fitur berbayar di aplikasi</li>
                        <li>Memulihkan pembelian di perangkat atau akun yang sama</li>
                    </ul>
                    <p>Pengguna dapat mengelola pembelian dan meminta pengembalian dana melalui akun Google Play
                        mereka.</p>

                    <h2>Layanan Pihak Ketiga</h2>
                    <p>
                        Aplikasi kami menggunakan layanan pihak ketiga berikut, yang dapat mengumpulkan dan menggunakan
                        data sesuai kebijakan privasi mereka:
                    </p>
                    <ul>
                        <li><strong>Unity Ads</strong> – <a href="https://unity.com/legal/privacy-policy"
                                                            target="_blank" rel="noopener">Kebijakan Privasi Unity</a>
                        </li>
                        <li><strong>Google Play Games Services</strong> – <a href="https://policies.google.com/privacy"
                                                                             target="_blank" rel="noopener">Kebijakan
                            Privasi Google</a></li>
                        <li><strong>Google Play Billing</strong> – <a href="https://policies.google.com/privacy"
                                                                      target="_blank" rel="noopener">Kebijakan Privasi
                            Google</a></li>
                    </ul>

                    <h2>Menonaktifkan dan Pengaturan</h2>
                    <p>Pengguna dapat mengatur atau menonaktifkan pengumpulan data tertentu:</p>
                    <ul>
                        <li><strong>Unity Ads:</strong> Ikuti petunjuk pada <a
                            href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener">halaman
                            Kebijakan Privasi Unity</a> untuk mengatur preferensi iklan atau menonaktifkan iklan yang
                            dipersonalisasi.
                        </li>
                        <li><strong>Google Play Games:</strong> Keluar atau atur izin di pengaturan akun Google Anda.
                        </li>
                        <li><strong>Pembelian Dalam Aplikasi:</strong> Pembelian dan langganan dapat dikelola atau
                            dikembalikan melalui akun Google Play Anda.
                        </li>
                    </ul>

                    <h2>Privasi Anak-Anak</h2>
                    <p>
                        Kami tidak dengan sengaja mengumpulkan informasi pribadi dari anak-anak di bawah usia 13 tahun
                        (atau usia yang berlaku di negara Anda). Jika Anda yakin kami telah mengumpulkan data pribadi
                        dari anak,
                        silakan hubungi kami dan kami akan menghapusnya.
                    </p>

                    <h2>Pengumpulan Data yang Diperlukan</h2>
                    <p>
                        Pengumpulan data di atas diperlukan agar aplikasi berfungsi dengan benar. Pengguna tidak dapat
                        menonaktifkan pengumpulan ini di dalam aplikasi.
                    </p>

                    <h2>Hubungi Kami</h2>
                    <p>
                        Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi
                        kami di:<br/>
                        <strong>mustakuusi6@gmail.com</strong>
                    </p>
                </>
            )}
        </div>
    );
};