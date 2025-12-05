<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy - NowNext',
  description: 'Privacy policy for NowNext event management platform'
})
</script>

<template>
  <div class="bg-white text-gray-900 antialiased min-h-screen">
    <UContainer>
      <div class="max-w-4xl mx-auto py-12">
        <!-- Header -->
        <div class="mb-12">
          <ULink
            to="/"
            class="text-sm text-gray-600 hover:text-indigo-600 inline-flex items-center gap-1 mb-6"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            Back to home
          </ULink>
          
          <h1 class="text-4xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p class="text-gray-600">
            Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>

        <!-- Content -->
        <UCard
          :ui="{
            base: 'rounded-none',
            ring: 'ring-1 ring-gray-200',
            body: 'p-8'
          }"
          class="bg-white shadow-xl"
        >
          <div class="prose prose-gray max-w-none">
            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Welcome to <SiteLogo class="inline" />. 
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our event management platform.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Register for an account</li>
                <li>Create or manage events</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter or communications</li>
              </ul>
              <p class="text-gray-700 leading-relaxed mb-4">
                This information may include your name, email address, and any other information you choose to provide.
              </p>

              <h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Data</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                We automatically collect certain information when you visit, use, or navigate our platform. This information may include:
              </p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Device and browser information</li>
                <li>IP address</li>
                <li>Usage patterns and preferences</li>
                <li>Event creation and management activities</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide, operate, and maintain our platform</li>
                <li>Improve and personalize your experience</li>
                <li>Process your event management activities</li>
                <li>Communicate with you about updates, security alerts, and support</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>With your consent:</strong> When you explicitly agree to share your information</li>
                <li><strong>Service providers:</strong> With trusted third-party service providers who assist us in operating our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p class="text-gray-700 leading-relaxed mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
                If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div class="bg-gray-50 p-6 border border-gray-200 rounded-none mt-4">
                <p class="text-gray-700 mb-2">
                  <strong>Email:</strong> 
                  <ULink to="/contact" class="text-indigo-600 hover:text-indigo-500 font-semibold">
                    Contact Form
                  </ULink>
                </p>
                <p class="text-gray-700">
                  <strong>Website:</strong> 
                  <ULink to="/" class="text-indigo-600 hover:text-indigo-500 font-semibold">
                    nownext.live
                  </ULink>
                </p>
              </div>
            </section>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
